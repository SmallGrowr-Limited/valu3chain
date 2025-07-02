// app/_layout.js
import { Drawer } from 'expo-router/drawer';
import { PaperProvider } from 'react-native-paper';
import CustomDrawerContent from '../../components/admin/CustomDrawer';

export default function Layout() { 
  return (
    
      <Drawer 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
        }}
      >
        <Drawer.Screen 
          name="index" 
          options={{ 
            title: 'Dashboard',
            drawerIcon: ({ color, size }) => (
              <Icon source="view-dashboard" color={color} size={size} />
            )
          }} 
        />
        {/* Add other screens similarly */}
      </Drawer>
   
  );
}