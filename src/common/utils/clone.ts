export function clone(obj: any): any {
    if (obj == null || typeof obj != "object") {
      return obj;
    }
  
    const temp: any = {}
    for (const key in obj) {
      temp[key] = clone(obj[key]);
    }
  
    return temp;
  }
  