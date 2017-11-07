package gerrymandering.measure;

import gerrymandering.model.BipartisanRegion;
import gerrymandering.model.State;

public interface StateMeasure {

	MeasureResult runStateMeasure(State state);

	default MeasureResult runMeasure(BipartisanRegion bipartisanRegion) {
		try {
			return runStateMeasure((State) bipartisanRegion);
		} catch(ClassCastException e) {
			System.err.println("Attempting to run StateMeasure on non-State BipartisanRegion");
			e.printStackTrace();
		}
		return null;
	}
} 
