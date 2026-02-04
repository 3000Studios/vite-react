
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}
