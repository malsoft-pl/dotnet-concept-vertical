﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;

namespace Concept.Vertical.Web.SignalR
{
  internal class ApplicationHub : Hub
  {
    private readonly IMessageForwarder _forwarder;

    public ApplicationHub(IMessageForwarder forwarder)
    {
      _forwarder = forwarder;
    }

    public void PublishData(JObject message, string routingKey)
    {
      _forwarder.Publish(message, routingKey);
    }
  }
}
