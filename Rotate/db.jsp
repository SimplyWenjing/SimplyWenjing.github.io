<%@ page language="java" contentType="text/html; charset=gbk"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.Statement"%>
<%
	request.setCharacterEncoding("utf-8");
	String qqNum = request.getParameter("qq");
	String phoneNum = request.getParameter("phone");
	try {
		String driver = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql://localhost:3306/database";
		String user = "root";
		String pwd = "";
		Class.forName(driver);
		Connection conn = DriverManager.getConnection(url, user, pwd);	
		String addSQL = "insert into connectinformation(qq,phone) values(?,?)"; 
		PreparedStatement pstmt = conn.prepareStatement(addSQL);
		pstmt.setString(1, qqNum);
		pstmt.setString(2, phoneNum);
		pstmt.executeUpdate();
		}
	  catch (SQLException e) {
	            e.printStackTrace();
	  }
%>
{"success":true}
