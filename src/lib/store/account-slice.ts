import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { Chain, goerli } from '@/lib/models/chain';
import { TAccount } from '../models/account';
import accountController from '../controller/account-controller';

const initialState: TAccount & { isLoading: boolean } = {
  wallet: undefined,
  chain: goerli,
  isLoading: false,
};

export const loadAccount = createAsyncThunk('account/setInitialState', async () => {
  const response = await accountController().getAccount();
  return response;
});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserWallet: (state, action: PayloadAction<ethers.HDNodeWallet | undefined>) => {
      state.wallet = action.payload;
    },
    setChain: (state, action: PayloadAction<Chain>) => {
      state.chain = action.payload;
    },
    setInitialState: (state, action: PayloadAction<TAccount>) => {
      const { chain, wallet } = action.payload;
      state.chain = chain;
      state.wallet = wallet;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAccount.fulfilled, (state, action) => {
        state.chain = action.payload.chain;
        state.wallet = action.payload.wallet;
        state.isLoading = false;
      });
  },
});

export const { setUserWallet, setChain } = accountSlice.actions;
export default accountSlice.reducer;
