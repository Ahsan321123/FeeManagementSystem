import React, { useState,useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';


const Voucher = () => {

    // Reciveing students Data in location object 
 const  location=useLocation()

//  Getting Data



const batchVocuhers= location.state?.vouchersData
const batchVocuhersMonth=location.state?.month
const batchVocuhersAnnualCharges = location.state?.annualCharges 
console.log(batchVocuhersAnnualCharges)


// singel Vocuher
const individualvoucherData= location.state?.voucherData
const annualChargesIndividual=location.state?.annualCharges
const SingelvoucherMonth = location.state?.month 







// console.log(SingelvoucherMonth)

// console.log(annualChargesIndividual ? annualChargesIndividual:"no cheked" )
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        border: '1px solid black',
        textAlign:'center',
        
    },
    subtitle: {
        fontSize: 12,
    },
    table: {
        width: '100%',
        border: '1px solid black',
        borderCollapse: 'collapse',
        height:"180px",
        marginBottom:4,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
    },
    tableCell: {
        flex: 1,
        border: '1px solid black',
        padding: 12.6,
        textAlign: 'center',
        fontSize: 12,
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
    },
    tableFooter: {
        borderTopWidth: 1,
        borderTopColor: '#666',
    },
});





const renderIndividualVoucher = () => {
        // Current Date

    let totalFee = annualChargesIndividual && individualvoucherData &&  annualChargesIndividual ? annualChargesIndividual + individualvoucherData.baseFee : individualvoucherData.baseFee

        let currentDate= Date.now()
        let timeStamp= new Date( currentDate)
    
       let date=  timeStamp.toISOString().split("T")[0]
    // Due Date
       let dateNow= new Date()
        let dueTimeStamp = new Date(dateNow.getTime() + (24 * 60 * 60 * 1000));
        let due = dueTimeStamp.toISOString().split("T")[0]
    return (
<>
        <View>
        <View style={styles.header}>
        
            <View>
                <Text style={styles.title}>Green Peace School</Text>
                <Text style={styles.subtitle}>Model Campus</Text>
            </View>
          
        </View>
        <Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
                <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
                <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
                <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
                <Text style={styles.tableCell}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">531</Text>
                <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
                <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
                <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {SingelvoucherMonth}
                <br/>
      
                
                
                </Text>
                <Text style={[styles.tableCell]} rowspan="3">{ annualChargesIndividual ? annualChargesIndividual + individualvoucherData.baseFee : individualvoucherData.baseFee } </Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
                <Text style={[styles.tableCell, {flex: 2}]}> 
                {date}
                </Text>
                <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
                <Text style={[styles.tableCell]}>{individualvoucherData.baseFee}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
                <Text style={[styles.tableCell, {flex: 2}]}> 
                {due}</Text>
                <Text style={[styles.tableCell]}>Payable After Due Date</Text>
                <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee)+ 500}</Text>
            </View>
        </View>
    </View>
// 2nd copy 

<View>
<View style={styles.header}>
        
        <View>
            <Text style={styles.title}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
      
    </View>
<Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>
<View style={styles.table}>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
    <Text style={styles.tableCell}>Amount</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">531</Text>
    <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
    <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {SingelvoucherMonth}</Text>
         <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
    <Text style={[styles.tableCell]}>{individualvoucherData.baseFee}</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
    <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee) + parseInt(individualvoucherData.lateFee)}</Text>
</View>
</View>
</View>
//3rd copy 

<View>
<View style={styles.header}>
        
        <View>
            <Text style={styles.title}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
      
    </View>
<Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>

<View style={styles.table}>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
    <Text style={styles.tableCell}>Amount</Text>
</View> <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>531</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>{individualvoucherData.studentName}</Text>
                    <Text style={[styles.tableCell, {flex: 1}]}>{individualvoucherData.className}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Tuition Fee of {SingelvoucherMonth}
                    
             
                    </Text>
                    
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 2, borderTopWidth: 0}]}>Annual Charges</Text>
                    <Text style={[styles.tableCell, {borderTopWidth: 0}]}>{annualChargesIndividual && annualChargesIndividual }</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 2, borderTopWidth: 0}]}>Lab Charges</Text>
                    <Text style={[styles.tableCell, {borderTopWidth: 0}]}>[Lab Amount]</Text>
                </View>


<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
    <Text style={[styles.tableCell]}>{individualvoucherData.baseFee}</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
    <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee) + parseInt(individualvoucherData.lateFee)}</Text>
</View>
</View>
</View>

</> 
    );
}; 
const renderBatchVouchers = () => {

// total fee 




    // Current Date
    let currentDate= Date.now()
    let timeStamp= new Date( currentDate)

   let date=  timeStamp.toISOString().split("T")[0]
// Due Date
   let dateNow= new Date()
    let dueTimeStamp = new Date(dateNow.getTime() + (24 * 60 * 60 * 1000));
    let due = dueTimeStamp.toISOString().split("T")[0]
    return batchVocuhers.map((individualvoucherData, index) => {

        let totalFee = batchVocuhersAnnualCharges  ? individualvoucherData.annualCharges + individualvoucherData.baseFee : individualvoucherData.baseFee
     return (
<>
           <View>
            <View style={styles.header}>
              
                <View>
                    <Text style={styles.title}>Green Peace School</Text>
                    <Text style={styles.subtitle}>Model Campus</Text>
                </View>
              
            </View>
            <Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
                    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">531</Text>
                    <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
                    <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}> 
                    {date}
                    </Text>
                    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}> 
                    {due}</Text>
                    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
                    <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee) + parseInt(individualvoucherData.lateFee)}</Text>
                </View>
            </View>
        </View>
// 2nd copy 

<View>
<View style={styles.header}>
            
            <View>
                <Text style={styles.title}>Green Peace School</Text>
                <Text style={styles.subtitle}>Model Campus</Text>
            </View>
          
        </View>
<Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>
<View style={styles.table}>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
        <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
        <Text style={styles.tableCell}>Amount</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">531</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
        <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
        <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
        <Text style={[styles.tableCell]}>{individualvoucherData.baseFee}</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
        <Text style={[styles.tableCell]}>Payable After Due Date</Text>
        <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee) + parseInt(individualvoucherData.lateFee)}</Text>
    </View>
</View>
</View>
//3rd copy 

<View>
<View style={styles.header}>
            
            <View>
                <Text style={styles.title}>Green Peace School</Text>
                <Text style={styles.subtitle}>Model Campus</Text>
            </View>
          
        </View>
<Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>

<View style={styles.table}>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
        <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
        <Text style={styles.tableCell}>Amount</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">531</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
        <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
        <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
        <Text style={[styles.tableCell]}>{individualvoucherData.baseFee}</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
        <Text style={[styles.tableCell]}>Payable After Due Date</Text>
        <Text style={[styles.tableCell]}>{parseInt(individualvoucherData.baseFee) + parseInt(individualvoucherData.lateFee)}</Text>
    </View>
</View>
</View>




</>
      );
    });
  }


const renderContent=()=>{
if( location.state.from==="generateAll"){
    return   renderBatchVouchers()
}else if (location.state.from==="generateSingle") {
    return renderIndividualVoucher()
}



}



  return (

    <PDFViewer width="100%" height="600">
 
    <Document>
    <Page size="A4" style={styles.page}>

                    {renderContent()}
                 

   
      </Page>
    </Document>

  </PDFViewer>

   

)}
 
export default Voucher;
