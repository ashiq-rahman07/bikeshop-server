import { Request, Response } from 'express';
import { BikeServices } from './bike.service';
import httpStatus from 'http-status';
// import bikeValidationSchema from './bike.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.file, req.body);

  sendResponse(res, {
    success: true,
    message: 'Product are created successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await BikeServices.getSingleBike(productId);

    res.status(200).json({
      message: 'Bike are retrieved succesfully',
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

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await BikeServices.deleteBikeFromDB(productId);

    res.status(200).json({
      message: 'Bike are delete succesfully',
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
const updateBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateBikeData = req.body;

    const result = await BikeServices.updateBikeFromDB(
      productId,
      updateBikeData,
    );

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

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  deleteBike,
  updateBike,
};
