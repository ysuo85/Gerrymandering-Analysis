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
public interface WhatIfService {
    public State combineDistrictsAuto(Collection<District> districts);

    public SuperDistrict combineDistrictsManual(Collection<District> districts);

    public State saveCompletedWork(State completedWork);

    public List<State> loadCompletedWorks(Integer numItems);

    public File downloadWork(State completedWork);
}
