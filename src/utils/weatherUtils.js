//rerurn arr  as range of unix timestamps 
export const getIntervalArray = (start, end, int)=>{
   //in seconds/ unix timestamp
   const arr = [start]
   let result = start
   while (result < end) {  
      result += int
      //console.log(result)
      if(result > end){
        //if we've gone past the end date, set to the end date
        arr.push(end)
      }else{
        arr.push(result)
      }
    }
    return arr
}


const convertTemp =(value)=>{ //pass in temp
    const bottom_value = -10; //minimum temperature
    const top_value = 100 // maximum temperature

    let range = top_value - bottom_value
    return (value - bottom_value) / range
}

export function percentageToHsl(temp, hue0, hue1) {
    let percentage = convertTemp(temp)
    //dont allow outside percentages
    if(percentage < 0){
        percentage = 0
    }
    if(percentage >1){
      percentage = 1
    }
    var hue = (percentage * (hue1 - hue0)) + hue0; //convert per to a number between hue1 and hue2
    return 'hsl(' + hue + ', 100%, 45%)';
}
