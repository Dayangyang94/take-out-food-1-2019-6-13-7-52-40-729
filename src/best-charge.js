function countItem(selectedItems){
  let numItem=[];
  let map=new Map();
  for(var i=0;i<selectedItems.length;i++){
      var item=selectedItems[i].split("x");
     numItem.push({"id":item[0].trim(),"num":Number(item[1])});
}
  return numItem;
}


// function loadAllItems() {
//   return [{
//     id: 'ITEM0001',
//     name: '黄焖鸡',
//     price: 18.00
//   }, {
//     id: 'ITEM0013',
//     name: '肉夹馍',
//     price: 6.00
//   }, {
//     id: 'ITEM0022',
//     name: '凉皮',
//     price: 8.00
//   }, {
//     id: 'ITEM0030',
//     name: '冰锋',
//     price: 2.00
//   }];
// }

//获取菜品的名字，价格，数量
function generateItems(selectedItems){
  let itemsArray=[];
  const itemDb=loadAllItems();
  console.log(itemDb);
  const numItem=countItem(selectedItems);
  console.log(numItem);
  for(let i=0;i<numItem.length;i++){
    for(var j=0;j<itemDb.length;j++){
      if(numItem[i].id==itemDb[j].id){
        itemsArray.push({
          id:itemDb[j].id,
          name:itemDb[j].name,
          price:itemDb[j].price,
          num:numItem[i].num
        });
        break;
      }

    }
  }
  return itemsArray; 
}
//统计各个商品总价格
function countTotalPrice(itemsArray){
let totalPrice=0;
for(var i=0;i<itemsArray.length;i++){  
    totalPrice+=itemsArray[i].price*itemsArray[i].num;
}
return totalPrice;
}
//统计优惠1商品总价格
function countTotalPriceTypeOne(itemsArray){
let totalPrice=0;
for(var i=0;i<itemsArray.length;i++){  
    totalPrice+=itemsArray[i].price*itemsArray[i].num;
}
if(totalPrice>30){
  totalPrice-=6;
}
return totalPrice;
}

//统计优惠2商品总价格
function countTotalPriceTypeTwo(itemsArray){
let totalPrice=0;
for(var i=0;i<itemsArray.length;i++){  
  if((itemsArray[i].id=='ITEM0001'&&itemsArray[i].num>0)||(itemsArray[i].id=='ITEM0022'&&itemsArray[i].num>0)){
    totalPrice+=itemsArray[i].price/2*itemsArray[i].num;
  }else{
    totalPrice+=itemsArray[i].price*itemsArray[i].num;
  }
   
}
return totalPrice;
}
//优惠方式
function loadPromotions() {
return [{
  type: '满30减6元'
}, {
  type: '指定菜品半价',
  items: ['ITEM0001', 'ITEM0022']
}];
}

// //选择优惠方式
function selectPromotions(itemsArray,price1,price2,price3){
let result="============= 订餐明细 =============\n";
itemsArray.forEach(function(item) {
  result+=item.name+" x "+item.num+" = "+(item.num*item.price)+"元\n"
});
result+=  "-----------------------------------\n";
let minPay=0;
if (price1!=0&&price2!=0&&price3!=0){
    minPay = (price1<price2)? price1:price2;
    minPay=(minPay<price3)? minPay:price3;
}else if (price3!=0&&price2==0){
    if (price1>price3){
        minPay=price3;
    }else {minPay=price1;}
}else if (price2!=0&&price3==0){
    if (price1>price2) {minPay=price2;}
    else {minPay=price1;}
}else {minPay=price1;}
if(minPay==price1){
  result+="总计："+price1+"元" +"\n===================================";
}
if((price1!=price2)&&(minPay==price2)){
  result+="使用优惠:\n" +
          "满30减6元，省"+(price1-price2)+"元\n" +  "-----------------------------------\n" +
          "总计："+price2+"元\n" +
          "===================================";
}
if((price1!=price3)&&minPay==price3){
  result+="使用优惠:\n" +
          "指定菜品半价(黄焖鸡，凉皮)，省"+(price1-price3)+"元\n" +
          "-----------------------------------\n" +
          "总计："+price3+"元\n" +
          "===================================";
}
return result;
}
function bestCharge(selectedItems){
let itemsArray=generateItems(selectedItems);
let price1=countTotalPrice(itemsArray);
let price2=countTotalPriceTypeOne(itemsArray);
let price3=countTotalPriceTypeTwo(itemsArray);
let result=selectPromotions(itemsArray,price1,price2,price3).trim();
return result;

}
module.exports = {countItem,loadAllItems,generateItems,countTotalPrice,countTotalPriceTypeOne,countTotalPriceTypeTwo,selectPromotions,bestCharge};