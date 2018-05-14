import requests from './requests';

class UserRequestController {
  static getAllRequests(req, res) {
    return res.status(200).json({
      status: 'success',
      data: {
        requests,
      },
    });
  }

  static getRequestByRequestId(req, res) {
    const findARequest = requests.find(requestFinder => requestFinder.requestId == req.params.requestId);
    if (!findARequest) {
      return res.status(404).json({

        status: 'fail',
        message: 'Request not found!',
      });
    }
    return res.status(200).json({

      status: 'success',
      message: 'Request found',
      data: {
        requests: findARequest,
      },
    });
  }

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
