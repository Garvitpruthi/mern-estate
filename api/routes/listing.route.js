import express from "express";
import { createListing, deleteListing, updateListing, getListing, getListings, addSaveHome, removeHome, getSavedHomes, getAggregateData, getTableData} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/savehome', addSaveHome);
router.post('/removehome', removeHome);
router.get('/getSavedHomes', getSavedHomes);
router.get('/getAggregateData/:id', getAggregateData);
router.get(`/table`, getTableData);
// router.post('/saveCompareHome', addCompareHome);
// router.post('/removeCompareHome', removeCompareHome);
// router.get('/getComparedHomes', getCompareHomes);
export default router; 