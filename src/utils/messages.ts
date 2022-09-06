import moment from 'moment';

export const formatMessages = (data : any) => {
  const { email, content } = data;
  return {
    email,
    content,
    time: moment().format('MM/DD/YYYY h:mm a'),
  };
};
