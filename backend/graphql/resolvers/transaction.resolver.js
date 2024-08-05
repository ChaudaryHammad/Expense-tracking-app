import Transaction from "../../models/transaction.model.js";

const transactionResolver = {
    Query:{
        transactions:async(_,__,context)=>{
            try {
                if(!context.getUser()){
                    throw new Error('Unauthorized User');
                }
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({userId})
                return transactions;

                
            } catch (error) {
                console.log(`Error in Transactions Query ${error}`);
                throw new Error(`${error.message} || Internal server error`);
            }
        },

        transaction:async(_,{transactionId})=>{
            try {
               
              const transaction = await Transaction.findById(transactionId);
                return transaction;

            } catch (error) {
                
                console.log(`Error in TransactionById Query ${error}`);
                throw new Error(`${error.message} || Internal server error`);
            }
        }

        // TRANSACTION BY CATEGORY
    },


    Mutation:{

        createTransaction :async(_,{input},context)=>{
            try {

                const newTransaction = new Transaction({
                    ...input,
                    userId:context.getUser()._id
                })

                await newTransaction.save();

                return newTransaction
                
            } catch (error) {
                console.log(`Error in CreateTransaction Mutation ${error}`);
                throw new Error(`${error.message} || Internal server error`);
            }

        },
        updateTransaction :async(_,{input})=>{

            try {

                const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true})
                return updateTransaction;
                
            } catch (error) {
                console.log(`Error in UpdateTransaction Mutation ${error}`);
                throw new Error(`${error.message} || Internal server error`);
            }

        },
        deleteTransaction :async(_,{transactionId})=>{
            try {

                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction;
                
            } catch (error) {
                console.log(`Error in deleteTransaction Mutation ${error}`);
                throw new Error(`${error.message} || Internal server error`);
            }

        }

        // 
    },

    // TRANSACTION BY CATEGORY
}


export default transactionResolver;