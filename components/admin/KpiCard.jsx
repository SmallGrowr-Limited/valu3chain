import { Card, Title, Icon } from 'react-native-paper';

export default function KpiCard({ title, value, icon }) {
  return (
    <Card style={{ width: '32%', alignItems: 'center', backgroundColor:"#fff" }}>
      <Card.Content style={{ alignItems: 'center' }}>
        <Icon source={icon} size={24} />
        <Title>{value}</Title>
        <Title style={{ fontSize: 14 }}>{title}</Title>
      </Card.Content>
    </Card>
  );
}


