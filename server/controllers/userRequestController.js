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
  static createRequest(req, res) {
    const newRequest = ({
      id: requests.length + 1,
      title: req.body.title,
      description: req.body.description,
      date: '2018-18-05',
      status: 'open',
      priority: req.body.priority,
      userId: 111,
    });
    requests.push(newRequest);
    return res.status(201).json({

      status: 'success',
      message: 'Request created successfully!',
      data: {
        requests: newRequest,
      },
    });
  }
}

export default UserRequestController;
