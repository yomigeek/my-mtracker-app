const requests = ([

  {
    id: 1,
    requestId: 31065,
    title: 'AC repairs',
    description: 'AC power supply faulty',
    date: '2018-17-05',
    status: 'pending',
    priority: 'high',
    userId: 111,
  },

  {
    id: 2,
    requestId: 4005,
    title: 'Printer ink exhausted',
    description: 'The ink of the printer exhausted',
    date: '2018-17-12',
    status: 'resolved',
    priority: 'medium',
    userId: 111,
  },

]);

class UserRequestController {
  static editRequest(req, res) {
    const findARequest = requests.find(requestFinder => requestFinder.requestId == req.params.requestId);
    if (!findARequest) {
      return res.status(404).json({
        status: 'fail',
        message: 'Request not found!',
      });
    }
    findARequest.title = req.body.title;
    findARequest.description = req.body.description;
    findARequest.priority = req.body.priority;
    return res.status(201).json({

      status: 'success',
      message: 'Request updated successfully!',
      data: {
        requests: findARequest,
      },
    });
  }
}

export default UserRequestController;
