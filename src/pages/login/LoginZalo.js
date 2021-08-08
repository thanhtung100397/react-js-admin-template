import React from "react";
import {appApiClient} from "../../services/apiClient";
import Redirect from "react-router-dom/es/Redirect";


const LoginZalo = (props) => {
  const query = new URLSearchParams(props.location.search);

  appApiClient.request({
    method: 'POST',
    url: 'api/authentication/zalo',
    data: {
      username: query.get('uid'),
      password: query.get('scope'),
      code: query.get('code')
    }
  }).then(
    data => console.log(data)
  )

  return <Redirect to="/preview/ui"/>
}

export default LoginZalo

