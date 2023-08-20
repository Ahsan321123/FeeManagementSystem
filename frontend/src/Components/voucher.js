import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';


const Voucher = ({batchVocuher,students}) => {

 const  location=useLocation()
 console.log(location.state)
const individualStudent = location.state?.studentData
const individualvoucherData= location.state?.voucherData

const styles = StyleSheet.create({
  page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
     
  },
  section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: '#FFF'
  },
  header: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20
  },
  details: {
      fontSize: 16,
      marginBottom: 10
  },
  table: {
      display: 'table',
      width: 'auto',
      margin: 20
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1
  },
  tableColHeader: {
      width: '50%',
      borderRightWidth: 1,
      backgroundColor: '#E4E4E4'
  },
  tableCol: {
      width: '50%'
  },
  tableCellHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 8
  },
  tableCell: {
      fontSize: 16,
      padding: 8
  }
});

if (individualStudent.lenght === 0 || individualvoucherData === 0) {
  return <div>Loading...</div>;
}


const renderIndividualVoucher = () => {
  return (
    <PDFViewer width="100%" height="600">
    <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.section}>
              <Text style={styles.header}>Fee Voucher</Text>
              <Text style={styles.details}>Student Name: {individualStudent.name}</Text>
              <Text style={styles.details}>GR No: {individualStudent.GRNo}</Text>
              <Text style={styles.details}>Class: {individualStudent.className}</Text>
              <View style={styles.table}>
                  <View style={styles.tableRow}>
                      <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Description</Text></View>
                      <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Amount</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Base Fee</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{individualvoucherData.baseFee}</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Late Fee (if any)</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{individualvoucherData.lateFee}</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Total Fee</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{individualvoucherData.totalFee}</Text></View>
                  </View>
              </View>
  
              <Text style={styles.details}>School Bank: {individualvoucherData.schoolBank}</Text>
              <Text style={styles.details}>Due Date: {individualvoucherData.dueDate}</Text>
          </View>
      </Page>
  </Document>
</PDFViewer> 

   );
}

const renderBatchVouchers = () => {
  return batchVocuher.map((data, index) => {
  
    <PDFViewer width="100%" height="600">
    <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.section}>
              <Text style={styles.header}>Fee Voucher</Text>
              <Text style={styles.details}>Student Name: {data.name}</Text>
              <Text style={styles.details}>GR No: {data.GRNo}</Text>
              <Text style={styles.details}>Class: {data.className}</Text>
              <View style={styles.table}>
                  <View style={styles.tableRow}>
                      <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Description</Text></View>
                      <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Amount</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Base Fee</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{data.baseFee}</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Late Fee (if any)</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{data.lateFee}</Text></View>
                  </View>

                  <View style={styles.tableRow}>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>Total Fee</Text></View>
                      <View style={styles.tableCol}><Text style={styles.tableCell}>{data.totalFee}</Text></View>
                  </View>
              </View>
  
              <Text style={styles.details}>School Bank: {individualvoucherData.schoolBank}</Text>
              <Text style={styles.details}>Due Date: {individualvoucherData.dueDate}</Text>
          </View>
      </Page>
  </Document>
</PDFViewer> 
  });
}
const 

  return (




   

)}
 
export default Voucher;
