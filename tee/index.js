


function GetRiskScore(dataGen){
    if(dataGen === "extremely high risk"){
        return 15000
    }
    if(dataGen === "high risk"){
        return 3000
    }
    if(dataGen === "slightly high risk"){
        return 225
    }
    if(dataGen ==="low risk"){
        return 30
    }
    throw Error("wrong data gen")
}