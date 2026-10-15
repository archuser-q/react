import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/** Lưu trữ nhỏ (token, cấu hình): SecureStore trên điện thoại, localStorage trên web. */

function webStore(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') return webStore()?.getItem(key) ?? null;
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    webStore()?.setItem(key, value);
    return;
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    // bỏ qua: chỉ giữ trong bộ nhớ
  }
}

export async function removeItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    webStore()?.removeItem(key);
    return;
  }
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    // ignore
  }
}

export const KEYS = {
  token: 'thonhanh_worker_token',
  apiUrl: 'thonhanh_worker_api_url',
};
