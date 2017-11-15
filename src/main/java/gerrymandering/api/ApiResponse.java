package gerrymandering.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gerrymandering.model.GeoJson;

/**
 * Created by yisuo on 11/15/17.
 */
public class ApiResponse {
    @JsonProperty
    private Boolean success;
    @JsonProperty
    private Object response;

    public ApiResponse(Boolean success){
        this.success = success;
        this.response = null;
    }

    public ApiResponse(Boolean success, Object response){
        this(success);
        this.response = response;
    }
}
