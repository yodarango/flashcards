import { Badge as MBadge, BadgeProps } from "@mui/base/Badge";

import "./Badge.scss";

export const Badge = (props: BadgeProps) => {
  return <MBadge {...props} />;
};
