import React, { useContext, useEffect, useState } from "react";
import { UserContext, hasAllProperties } from '../../lib';

const HasRole = ({ children, roles }) => {
  const [canAccess, setCanAccess] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(hasAllProperties(user.role, roles)) {
      setCanAccess(true);
    }
  }, [user.role]);

  if (canAccess) {
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }

  return false;
}

export default HasRole;
