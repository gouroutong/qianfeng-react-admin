import React from "react";
import { Card, Statistic ,Icon} from "antd";

function Index() {
  return (
    <Card title="数据汇总">
      <Card.Grid>
        <Statistic title="新增用户" value={112893} />
      </Card.Grid>
      <Card.Grid>
      <Statistic title="总用户" value={1128} prefix={<Icon type="like" />} />
      </Card.Grid>
      <Card.Grid>
      <Statistic title="今日订单" value={1128} prefix={<Icon type="like" />} />
      </Card.Grid>
    </Card>
  );
}

export default Index;
