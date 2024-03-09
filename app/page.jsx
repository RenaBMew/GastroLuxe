import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center items-center h-96">
          <h1 className="text-4xl">GastroLuxe</h1>
        </div>
        <div className="section flex items-center h-96">
          <div>
            <Image
              src="/pancakes.jpg"
              alt="Pancakes"
              width={400}
              height={300}
              className="rounded-full mt-4"
            />
          </div>
          <div className="content ml-4">
            <p>
              GastroLuxe is for Foodies. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod ipsa, deserunt distinctio repudiandae sit
              optio officia blanditiis voluptas commodi fugit nobis! Omnis vel,
              vero recusandae quam veritatis iste non quas?
            </p>
          </div>
        </div>
        <div className="section flex items-center h-96">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              distinctio sint nobis voluptate magni quis consectetur nam?
              Quibusdam minima at nesciunt, molestiae hic, impedit est voluptate
              possimus cumque, veniam fuga!.
            </p>
          </div>
          <div className="content ml-4">
            <Image
              src="/spaghetti.jpg"
              alt="Description of the photo"
              width={400}
              height={300}
              className="rounded-full mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
