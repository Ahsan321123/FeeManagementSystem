import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';


const Voucher = () => {

    // Reciveing students Data in location object 
 const  location=useLocation()

//  Getting Data

 const individualvoucherData= location.state?.voucherData

const batchVocuhers= location.state?.vouchersData
console.log(batchVocuhers)
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
    },
    copyLabel: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        padding: 10,
    },
    tableCell: {
        flex: 1,
        padding: 10,
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
    },
    totalRow: {
        fontWeight: 'bold',
        backgroundColor: '#e0e0e0',
    },
    footer: {
        marginTop: 20,
        fontSize: 16,
    },
});

const renderIndividualVoucher = () => {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Green Peace School</Text>
                    <Text style={styles.subtitle}>Model Campus</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Bank:{individualvoucherData.schoolBank}</Text>
                    <Text style={styles.subtitle}>Acc#: 123-456-789</Text>
                </View>
            </View>
            <Text style={styles.copyLabel}>Monthly Bill for {individualvoucherData.month}</Text>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Student Name: {individualvoucherData.studentName}</Text>
                <Text style={styles.tableCell}>Class: {individualvoucherData.className}</Text>
                <Text style={styles.tableCell}>Date</Text>
            </View>
            <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Description</Text>
                <Text style={styles.tableCell}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>School Fee</Text>
                <Text style={styles.tableCell}>{individualvoucherData.baseFee}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Late Fee</Text>
                <Text style={styles.tableCell}>{individualvoucherData.lateFee}</Text>
            </View>
    
         <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={styles.tableCell}>Total</Text>
                <Text style={styles.tableCell}>{individualvoucherData.totalFee}</Text>
            </View>
            <Text style={styles.footer}>Payment Details: XYZ School Bank Account: 123-456-789</Text>
        </Page>
    );
};
const renderBatchVouchers = () => {
    return batchVocuhers.map((data, index) => {
     return (
        <Page size="A4" style={styles.page}>
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>Green Peace School</Text>
                <Text style={styles.subtitle}>Model Campus</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Bank:{data.schoolBank}</Text>
                <Text style={styles.subtitle}>Acc#: 123-456-789</Text>
            </View>
        </View>
        <Text style={styles.copyLabel}>Monthly Bill for {data.month}</Text>
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Student Name: {data.studentName}</Text>
            <Text style={styles.tableCell}>Class: {data.className}</Text>
            <Text style={styles.tableCell}>Date</Text>
        </View>
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>School Fees</Text>
            <Text style={styles.tableCell}>{data.baseFee}</Text>
        </View>
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Late Fee</Text>
            <Text style={styles.tableCell}>{data.lateFee}</Text>
        </View>
        <View style={[styles.tableRow, styles.totalRow]}>
            <Text style={styles.tableCell}>Total</Text>
            <Text style={styles.tableCell}>{data.totalFee}</Text>
        </View>
        <Text style={styles.footer}>Payment Details: XYZ School Bank Account: 123-456-789</Text>
    </Page>
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
      {renderContent()}
    </Document>
  </PDFViewer>

   

)}
 
export default Voucher;
