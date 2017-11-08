package gerrymandering.measure;

import gerrymandering.model.MultiDistrictRegion;

public interface Measure {
	MeasureResults runMeasure(MultiDistrictRegion region);
}
