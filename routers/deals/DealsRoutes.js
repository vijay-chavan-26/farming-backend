
import {Router} from 'express'
const router = Router()
import CreateDeals from '../../controllers/deals/CreateDeals.js' 
import GetAllDeals from '../../controllers/deals/GetAllDeals.js' 
import RejectDeals from '../../controllers/deals/RejectDeals.js'
import AcceptDeals from '../../controllers/deals/AcceptDeals.js'
import GetDealsByUser from '../../controllers/deals/GetDealsByUser.js'


router.route('/create').post(CreateDeals)
router.route('/get-all-deals').get(GetAllDeals);
router.route('/get-deals-user/:id').get(GetDealsByUser);
router.route('/accept-deals').put(AcceptDeals);
router.route('/reject-deals').put(RejectDeals);

export default router