import { prisma } from "../config/database";
import { TWifi, TCreateWifi } from "../types/wifiTypes";


export async function storeWifi(dataList:TCreateWifi){
  await prisma.wifis.create({
   data: dataList
  });
}

export async function findWifiById(id:number) {
  const wifi = await prisma.wifis.findUnique({
   where:{
    id
   }
  });
  
  return wifi;
}

export async function findAllWifis(userId:number){
  const wifis = await prisma.wifis.findMany({
   where:{
    userId
   }
  });
  
  return wifis;
}

export async function deleteWifiById(id:number){
  await prisma.wifis.delete({
   where:{
    id
   }
  }); 
}