import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { Chain, goerli } from "@/lib/models/chain";

export type TAccount = {
  wallet?: ethers.HDNodeWallet;
  chain: Chain;
};

const initialState: TAccount = {
  wallet: undefined,
  chain: goerli,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserWallet: (
      state,
      action: PayloadAction<ethers.HDNodeWallet | undefined>,
    ) => {
      state.wallet = action.payload;
    },
    setChain: (state, action: PayloadAction<Chain>) => {
      state.chain = action.payload;
    },
  },
});

export const { setUserWallet, setChain } = accountSlice.actions;
export default accountSlice.reducer;
