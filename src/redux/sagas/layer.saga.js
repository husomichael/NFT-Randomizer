import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addLayer(action){
    try{
        const response = yield axios({
            method: 'POST',
            url: '/api/layers',
            data: action.payload
        })
        yield put({
            type: 'GET_LAYERS',
        })
    }catch(error){
        console.log('addLayer catch error:', error);
    };
};

function* getLayers(action){
    try{
        const response = yield axios({
            method: 'GET',
            url: '/api/layers'
        })
        yield put({
            type: 'SET_LAYERS',
            payload: response.data
        })
    }catch(error){
        console.log('getLayers error:', error);
    };
};

function* deleteLayer(action){
    try{
        const response = yield axios({
            method: 'DELETE',
            url: `/api/layers/${action.payload}`
        })
        yield put({
            type: 'GET_LAYERS'
        })
    }catch(error){
        console.log('deleteLayer error:', error);
    };
};

function* fetchOneLayer(action) {
    try{
        const response = yield axios({
            method: 'GET',
            url: `/api/layers/edit/${action.payload}`
        })
        const layerToEdit = response.data;
        yield put({
            type: 'SET_LAYER_TO_EDIT',
            payload: layerToEdit
        })
    } catch (err) {
        console.log(err);
    };
};
  
function* editLayer(action) {
    try{
        yield axios({
            method: 'PUT',
            url: `/api/layers/edit/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'GET_LAYERS'
        })
    } catch (err) {
        console.log(err)
    };
};

function* layerSaga() {
    yield takeEvery('ADD_LAYER', addLayer);
    yield takeEvery('GET_LAYERS', getLayers);
    yield takeEvery('DELETE_LAYER', deleteLayer);
    yield takeEvery('EDIT_LAYER', editLayer);
    yield takeEvery('FETCH_ONE_LAYER', fetchOneLayer);
};
  
export default layerSaga;