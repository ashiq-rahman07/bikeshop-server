import { Request, Response } from 'express';

import httpStatus from 'http-status';
// import bikeValidationSchema from './bike.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GearServices } from './gear.service';

// const createGear = catchAsync(async (req, res) => {
//   const result = await BikeServices.createBikeIntoDB(req.file, req.body);

//   sendResponse(res, {
//     success: true,
//     message: 'Product are created successfully',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });

const getAllGears = catchAsync(async (req, res) => {
  const result = await GearServices.getAllGears(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gear are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleGear = async (req: Request, res: Response) => {
  try {
    const { gearId } = req.params;

    const result = await GearServices.getSingleGear(gearId);

    res.status(200).json({
      message: 'Gear are retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteGear = async (req: Request, res: Response) => {
  try {
    const { gearId } = req.params;

    await GearServices.deleteGear(gearId);

    res.status(200).json({
      message: 'Gear are delete successfully',
      status: true,

      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const updateGear = async (req: Request, res: Response) => {
  try {
    const { gearId } = req.params;
    const updateGearData = req.body;

    const result = await GearServices.updateGear(gearId, updateGearData);

    res.status(200).json({
      message: 'Bike are update succesfully',
      status: true,

      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const GearControllers = {
  getAllGears,
  getSingleGear,
  deleteGear,
  updateGear,
};
