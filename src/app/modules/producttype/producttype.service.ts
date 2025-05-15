import mongoose from 'mongoose';
import { Bike } from '../bikes/bike.model';
import { Gear } from '../gear/gear.model';
import { Request, Response } from 'express';




const addProductTypeFields = async (req:Request,res:Response) => {
  try {


    // Update bikes collection
    const bikeResult = await Bike.updateMany(
      { productType: { $exists: false } },
      { $set: { productType: 'bike' } }
    );
    console.log(`Bikes updated: ${bikeResult.modifiedCount}`);

    // Update gears collection
    const gearResult = await Gear.updateMany(
      { productType: { $exists: false } },
      { $set: { productType: 'gear' } }
    );
    console.log(`Gears updated: ${gearResult.modifiedCount}`);
res.send({message:'succesfully update bike and gear filed'})
 
  } catch (error) {
    console.error('Error updating collections:', error);
  }
};


export const typeControler = {
addProductTypeFields
}