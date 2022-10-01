export const options = (to, username, otp) => {
    return {
        from: process.env.SMTP_ID,
        to,
        subject: '✉ Verify your Cithi account',
        html: `Hi ${username} 🙂 ,
        
We just need to verify your email address before you use our service.

Verify your email address : <b>${otp}</b>

Thanks! – The ✉Cithi team        
        `
    }
}
