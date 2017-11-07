package gerrymandering.measure;

import gerrymandering.model.BipartisanRegion;

public interface Measure {
	MeasureResult runMeasure(BipartisanRegion bipartisanRegion);
}
