import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function AttributeLayerItem({layer, params}){

    const dispatch = useDispatch();
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');
    const attributes = useSelector (store => store.attributes);
    let layerRarity = 0;

    function setAttribute(event){
        setInputAttribute(event.target.value);
    };

    function setRarity(event){
        setInputRarity(event.target.value);
    };

    {attributes.map(attribute => {
        if(attribute.layer_id == layer.id){
            layerRarity += attribute.rarity_value;
        };
    })}



    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: {attribute: inputAttribute, rarity: inputRarity, layer: layer.id, project: params}
        });
        setInputAttribute('');
        setInputRarity('');
    };

    return(
        <div>
            <h2>Layer - {layer.layer_name}</h2>
            <h4>Total Rarity: {layerRarity}%</h4>
            <input
            placeholder="Attribute Name"
            value={inputAttribute} 
            onChange={setAttribute}
            />
            <input
            placeholder="Set Rarity %"
            value={inputRarity}
            onChange={setRarity}
            />
            <button onClick={addAttribute}>Add Attribute</button>
        </div>
    )
};

export default AttributeLayerItem;