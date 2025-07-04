import axiosClient from '../configs/axios.configs';
import { IFeedback } from '../interfaces/feedback.interface';

const FeedbackApis = {
  sendFeedback: (payload: IFeedback) => {
    return axiosClient.post(`/feedback`, payload);
  },
};

export default FeedbackApis;
