export function updateObject(allData,updateData,setData) {
    const update = allData.map((object) =>
        object.id === updateData.id ? updateData : object
    );
    setData(update);
}

export function removeObject(id,allData,setData){
    const update=allData.filter(object=>object.id!==id);
    setData(update);
}

