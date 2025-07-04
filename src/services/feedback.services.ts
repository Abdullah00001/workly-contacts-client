import FeedbackApis from '../apis/feedback.apis';
import { IFeedback } from '../interfaces/feedback.interface';

const { sendFeedback } = FeedbackApis;

const FeedbackServices = {
  processSendFeedback: async (payload: IFeedback) => {
    try {
      const response = await sendFeedback(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown Error Occurred In Send Feedback Service');
    }
  },
};

export default FeedbackServices;
