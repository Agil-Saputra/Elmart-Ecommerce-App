export default function useSortByCriteria(data, criteria) {
    return data.sort(function (a, b) {
      const sorts= ['price', 'title']
      const aPrice = a[sorts[0]];
      const bPrice = b[sorts[0]];
      const aTitle = a[sorts[1]];
      const bTitle = b[sorts[1]];
  
      switch(criteria) {
        case "price(highest)": {
          return bPrice - aPrice 
        }; 
        case "price(lowest)" : {
          return aPrice - bPrice 
        };
        case "title(A-Z)" : {
          return aTitle.localeCompare(bTitle);
        };
        case "title(Z-A)" : {
          return bTitle.localeCompare(aTitle);
        };
        default:
          return a, b;
      }
      
    });
  }