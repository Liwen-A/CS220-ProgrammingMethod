/*This Homework implements the filtering function, 
like the one "Yelp", using Json */



//let data = lib220.loadJSONFromURL(
 // 'https://people.cs.umass.edu/~joydeepb/yelp.json');
 let data = lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp-tiny.json');

class FluentRestaurants {
  constructor(data){
    this.data = data;
  }


/* takes a string, stateStr, and returns a new FluentRestaurants object in which all
restaurants are located in the given state, stateStr. */
  fromState(stateStr){
    function f(obj) {
      if (lib220.getProperty(obj,"state").found === false){
        return false;
      }
      else
       return lib220.getProperty(obj,"state").value===stateStr;
    }
    let r = this.data.filter(f);
    return new FluentRestaurants(r);
  }


  //ratingLeq(rating: number): FluentRestaurants
  /*It takes a number, rating, and returns a new FluentRestaurants object that holds 
  restaurants with ratings less than or equal to rating. */
  ratingLeq(rating){
    function f(obj) {
      if (lib220.getProperty(obj,"stars").found === false){
        return false;
      }
      else
       return lib220.getProperty(obj,"stars").value <= rating;
    }
    let r = this.data.filter(f);
    return new FluentRestaurants(r);
  }

  //ratingGeq(rating: number): FluentRestaurants
  /*It takes a number, rating, and returns a new FluentRestaurants object that 
  holds restaurants with ratings which are greater than or equal to rating*/
   ratingGeq(rating){
    function f(obj) {
      if (lib220.getProperty(obj,"stars").found === false){
        return false;
      }
      else
       return lib220.getProperty(obj,"stars").value >= rating;
    }
     let r = this.data.filter(f);
     return new FluentRestaurants(r);
  }


  //category(categoryStr: string): FluentRestaurants
  /*takes a string, categoryStr, and produces a new FluentRestaurants object that holds
    only those restaurants that have the provided category, categoryStr*/
   category(categoryStr){
    function f(obj) {
      if (lib220.getProperty(obj,"categories").found === false){
        return false;
      }
      else
       return lib220.getProperty(obj,"categories").value.includes(categoryStr);
    }     
     let r = this.data.filter(f);
     return new FluentRestaurants(r);
  }


  //hasAmbience(ambienceStr: string): FluentRestaurants
/*It takes a string, ambienceStr, and produces a new FluentRestaurants object with
restaurants that have the provided ambience, ambienceStr. Each restaurant object contains an
‘attributes’ key that may or may not contain an Ambience key, which itself is an object:*/
   hasAmbience(ambienceStr){
     function f(obj) {
       if(lib220.getProperty(obj,"attributes").found === false){
         return false;
       }
       else if (lib220.getProperty(lib220.getProperty(obj,"attributes").value,"Ambience").found === false){
         return false;
       }
       else if (lib220.getProperty(lib220.getProperty(lib220.getProperty(obj,"attributes").value,"Ambience").value,ambienceStr).found === false){
        return false;
       }
       else {
         return lib220.getProperty(lib220.getProperty(lib220.getProperty(obj,"attributes").value,"Ambience").value,ambienceStr).value;
       }
      }
      return new FluentRestaurants(this.data.filter(f));
     }
     
//bestPlace(): Restaurant | {}
/*returns the “best” restaurant. The “best” restaurant is the highest rated restaurant. 
If there is a tie, pick the one with the most reviews. If there’s a tie with the most reviews, 
pick the first restaurant. If there is no matching result, it should return an empty object.
*/
   bestPlace(){
     let data1 = this.data.filter(function(obj) {return lib220.getProperty(obj,"stars").found;});
     let highestStar = data1.reduce(function(num,obj) {return Math.max(obj.stars,num);},0);
     let data2 = data1.filter(function(obj) {return lib220.getProperty(obj,"stars").value === highestStar;});
     if (data2.length === 0){
       return {};
     }
     else if(data2.length === 1) {
       return data2[0];
     }
     else {
       let data3 = data2.filter(function(obj) {return lib220.getProperty(obj,"review_count").found;});
       let highestC = data3.reduce(function(num,obj) {return Math.max(obj.review_count,num);},0);
       let data4 = data3.filter(function(obj) {return lib220.getProperty(obj,"review_count").value === highestC;});
       if (data4.length === 0) {
         return {};
       }
       else{
         return data4[0];
       }
     }
  }
}


let t = new FluentRestaurants([{attributes: {Ambience: {hi:true}}},{grade: 1},{attributes: {Ambience: {hi:false}}},{attributes: {s:1}}]);

