package gerrymandering.service;

import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Polygon;
import gerrymandering.common.CommonConstants;
import gerrymandering.model.*;
import org.springframework.stereotype.Service;
import org.wololo.geojson.Feature;
import org.wololo.geojson.FeatureCollection;
import org.wololo.geojson.Geometry;
import org.wololo.jts2geojson.GeoJSONWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by yisuo on 11/14/17.
 */
@Service("geoRenderingService")
public class GeoRenderingServiceImpl implements GeoRenderingService {
    private GeoJSONWriter writer = new GeoJSONWriter();

    @Override
    public GeoJson buildGeoJson(List<State> states) {
        List<Feature> featureCollection =
            states.stream().map(this::buildState).collect(Collectors.toList());
        FeatureCollection result = writer.write(featureCollection);
        return new GeoJson(result);
    }

    @Override
    public GeoJson buildGeoJson(State state) {
        List<District> districts = state.getDistricts();
        List<Feature> featureCollection = new ArrayList<>();
        districts.forEach(district -> {
            featureCollection.add(buildDistrict(district));
        });
        FeatureCollection result = writer.write(featureCollection);
        return new GeoJson(result);
    }

    @Override
    public GeoJson buildGeoJson(District district) {
        List<Feature> featureCollection = new ArrayList<>();
        featureCollection.add(buildDistrict(district));
        FeatureCollection result = writer.write(featureCollection);
        return new GeoJson(result);
    }

    @Override
    public GeoJson buildGeoJson(SuperDistrict superDistrict) {
        return null;
    }

    private Feature buildState(State state){
        Map<String, Object> properties = new HashMap<>();
        properties.put("StateId", state.getStateId());
        properties.put("StateName", state.getStateName());

        return buildFeature(state.getBoundaries(), properties);
    }

    private Feature buildDistrict(District district){
        Map<String, Object> properties = new HashMap<>();
        properties.put("StateId", district.getState().getStateId());
        properties.put("DistrictNo", district.getDistrictNo());

        return buildFeature(district.getBoundaries(), properties);
    }

    private Feature buildFeature(List<Boundary> boundaries, Map<String, Object> properties){
        Geometry converted = null;
        if(boundaries.size() == CommonConstants.CONTIGUOUS){
            Polygon polygon = boundaries.get(CommonConstants.FIRST_ELEMENT).getShape();
            converted = writer.write(polygon);
        }
        else if(boundaries.size() > CommonConstants.CONTIGUOUS){
            Polygon[] polygons = new Polygon[boundaries.size()];
            boundaries.stream().map(Boundary::getShape).collect(Collectors.toList()).toArray(polygons);
            MultiPolygon multi = new MultiPolygon(polygons, new GeometryFactory());
            converted = writer.write(multi);
        }
        return new Feature(converted, properties);
    }
}
