function validate(data, rules){
  let errors = [];
  let errorObj = {};
  let ruleObj = null;
  let dataField = null;

  for (let k in rules)
  {
      dataField = data[k];
      if (dataField === null || dataField === undefined)
      {
         if (rules[k]["required"])
         {
             errorObj.field = k;
             errorObj.value = dataField;
             errorObj.rule = "required";
             errors.push(errorObj);
             errorObj = {};
         }
      }
      else
      {
        ruleObj = rules[k];
        for (let k2 in ruleObj)
        {
          switch(k2)
          {
            case 'isString':
              if(isString(dataField) !== ruleObj["isString"])
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'isString';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "isNumber":
              if(isNumber(dataField) !== ruleObj["isNumber"])
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'isNumber';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "isBoolean":
              if(isBoolean(dataField) !== ruleObj["isBoolean"])
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'isBoolean';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "minLength":
              if(!minLength(dataField, ruleObj["minLength"]))
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'minLength';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "maxLength":
              if(!maxLength(dataField, ruleObj["maxLength"]) )
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'maxLength';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "min":
              if(!min(dataField, ruleObj["min"]))
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'min';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "max":
              if(!max(dataField, ruleObj["max"]))
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'max';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
            case "isEmail":
              if(!isEmail(dataField))
              {
                errorObj.field = k;
                errorObj.value = dataField;
                errorObj.rule = 'isEmail';
                errors.push(errorObj);
                errorObj = {}
              }
              break;
          }
        }
      }
  }
  return {"errors": errors, "result": errors.length === 0} 
}

function isString(obj)
{
  return (typeof obj === "string");
}

function isNumber(obj)
{
  return isNaN(obj) ? false: typeof obj === "number";
}

function isBoolean(obj)
{
  return typeof obj === "boolean"
}

function minLength(val, ruleLen)
{
  return val.length >= ruleLen
}

function maxLength(val, ruleLen)
{
  return val.length <= ruleLen
}

function min(val, ruleNum)
{ 
  return val >= ruleNum
}

function max(val, ruleNum)
{
  return val <= ruleNum
}

function isEmail(val)
{
  let aPos = val.indexOf("@"); 
  return aPos >=0 && val.indexOf(".") >= aPos
}


module.exports = validate;