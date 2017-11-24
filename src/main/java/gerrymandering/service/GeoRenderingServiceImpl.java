package gerrymandering.service;

import com.vividsolutions.jts.geom.*;
import gerrymandering.common.CommonConstants;
import gerrymandering.model.*;
import org.springframework.stereotype.Service;
import org.wololo.geojson.Feature;
import org.wololo.geojson.FeatureCollection;
import org.wololo.geojson.Geometry;
import org.wololo.jts2geojson.GeoJSONWriter;

import java.util.*;
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
        addElectionData(state, properties);
        addCentroid(state, properties);
        return buildFeature(state.getBoundaries(), properties);
    }

    private Feature buildDistrict(District district){
        Map<String, Object> properties = new HashMap<>();
        properties.put("StateId", district.getState().getStateId());
        properties.put("DistrictNo", district.getDistrictNo());
        addElectionData(district, properties);
        addCentroid(district, properties);
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

    private void addElectionData(BipartisanRegion electionRegion, Map<String, Object> properties){
        properties.put("ElectedParty", electionRegion.getElectedParty());
        properties.put("Votes", electionRegion.getVotes());
        properties.put("TotalVotes", electionRegion.getTotalVotes());
//        properties.put("TotalPopulation", electionRegion.getTotalPopulation());
//        properties.put("Population", electionRegion.getPopulationGroups());
//        properties.put("PercentPopulation", electionRegion.getPopulationPercents());
        properties.put("PercentVotes", electionRegion.getPercentVotes());
    }

    private void addCentroid(GeoRegion region, Map<String, Object> properties){
        List<Boundary> boundaries = region.getBoundaries();
        Point mainArea = boundaries
                .stream()
                .max((a, b) -> a.getShape().getArea() > b.getShape().getArea() ? 1 : -1)
                .get()
                .getShape()
                .getCentroid();

        properties.put("CenterX", mainArea.getX());
        properties.put("CenterY", mainArea.getY());
    }
}
