function autoReceiveValue(a){
    console.log("value automaticlaly received",a)
}

function autoPassValue(fn){
    const a= 5;
    return fn(a)
}


autoPassValue(autoReceiveValue)