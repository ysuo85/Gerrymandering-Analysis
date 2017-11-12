package gerrymandering.service;

import gerrymandering.model.District;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;

import java.io.File;
import java.util.Collection;
import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public class WhatIfService {
    public State combineDistrictsAuto(Collection<District> districts){
        return null;
    }

    public SuperDistrict combineDistrictsManual(Collection<District> districts){
        return null;
    }

    public State saveCompletedWork(State completedWork){
        return null;
    }

    public List<State> loadCompletedWorks(Integer numItems){
        return null;
    }

    public File downloadWork(State completedWork){
        return null;
    }
}
