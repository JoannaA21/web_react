import { useState, useEffect } from "react";
import { CourseList } from "./adminData";
import Course from "./Course";
import SearchCourse from './SearchCourse';

//Student search courses (list of courses available)
export const StudentRegisterCourse = () => {
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    if (!token) window.location.href = 'login';

    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('ListofCourses') || JSON.stringify(CourseList)));
    let [studentSearch, setStudentSearch] = useState('');
    const [searchBtn, setSearchButton] = useState(false);

    // useEffect to hide the button after registration of course.
    useEffect(() => {
        const storedCourse = JSON.parse(localStorage.getItem('course') || '[]');
        // check value if not empty
        if (storedCourse) {
            // get all 
            storedCourse.forEach(c => {
                console.log(c.course.id);
                // compare student id with course student id's and then hide it.
                if (token.id === c.StudentId) {
                    // get course id to hide
                    const courseIdToHide = c.course.id;
                    // hide course register button
                    const buttonElement = document.querySelector(`#courseContainer-${courseIdToHide}`);
                    if (buttonElement) {
                        buttonElement.style.display = 'none';
                    }
                }

            });
        }

        const exchange = JSON.parse(localStorage.getItem('exchangecourse') || '[]') 
        console.log(exchange)
        if(exchange){
            console.log(exchange.course)
            storedCourse.forEach(c => {
                if (token.id === c.StudentId && c.course.id === exchange.course.id){
                    const courseId = c.course.id

                    const buttonElement = document.querySelector(`#courseContainer-${courseId}`);
                    const rbtn = document.querySelector(`#courseRegister-${courseId}`);
                    if (buttonElement) {
                        buttonElement.style.display = 'block';
                        rbtn.style.display = 'none';
                        buttonElement.style.border = '5px solid green';
                    }
                }
            });
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchButton({ search }.SearchCourse);

        const course = { search }.filter((c) => c.code.toLowerCase() === studentSearch.toLowerCase()
            || c.title.toLowerCase() === studentSearch.toLowerCase());
    };

    //Student register for courses
    const handleRegister = (course) => {
        const studId = { StudentId: token.id, course };
        const storedCourse = localStorage.getItem('course');
        let existingCourse = [];

        if (storedCourse) {
            existingCourse = JSON.parse(storedCourse);
        }

        existingCourse.push(studId);

        localStorage.setItem('course', JSON.stringify(existingCourse));
        alert("You have successfully registered!");
        const buttonElement = document.querySelector(`#courseContainer-${studId.course.id}`);
        if (buttonElement) {
            buttonElement.style.display = 'none';
        }
    };

    return (
        <>
            <SearchCourse
                searchCourse={studentSearch}
                setSearch={setStudentSearch}
            />
            <Course
                courses={search.filter(course =>
                    course.code.toLowerCase().includes(studentSearch.toLowerCase()) ||
                    course.title.toLowerCase().includes(studentSearch.toLowerCase())
                )}
                handleDelete={""}
                handleRegister={handleRegister}
            />
        </>
    );
};

//Student information after logged in
export const StudentInformation = () => {
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    if (!token) window.location.href = 'login';

    //
    const getCourse = JSON.parse(localStorage.getItem('course'));
    if (getCourse) {
        getCourse.forEach(e => {
            if (token.id === e.StudentId) {
                console.log(e.course);
            }
            //console.log(e.StudentId)
        });
    }

    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('course') || '[]'));
    let [studentSearch, setStudentSearch] = useState('');
    //Student exchnage course
    const handleExchange = (course) => {
        let storedCourse = localStorage.getItem('course')
        localStorage.setItem('exchangecourse', JSON.stringify(course))
        window.location.href = 'studentregistercourse'
    }

    //handleDrop
    return (
        <>
        <div>
            <h2>{token.role}</h2>
            <p><b>Program: </b>{token.program} </p>
            <p><b>Department: </b>{token.department} </p>
            <p><b>Username: </b> {token.username}</p>
            <p><b>First name: </b>{token.fname} </p>
            <p><b>Last name: </b>{token.lname} </p>
            <p><b>Email: </b>{token.email} </p>
            <p><b>Phone: </b>{token.phone} </p>
            <p><b>DOB: </b>{token.dob}</p>
        </div>

        <Course
                courses={search.filter(rcourse =>
                    rcourse.course.code
                )}
                handleDelete={""}
                handleRegister={""}
                handleExchange={handleExchange}
            />
            
        </>
    );
};
