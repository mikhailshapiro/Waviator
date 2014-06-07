%clc
%clear
%close all
%prompt user to input current and voltage
current = input('What is the current limit of your motor controller? ');
voltage = input('What cell voltage are you using? ');

%Equations for determinging the "Knee" RPM of the torque curve
kneeOld = 1480+(375-current)*(1.9)
constantT = 30.9*(current/375)+0.0228*(current-375)
kneeNew = kneeOld*(voltage/24)

%Alternative Method for finding the Knee
%kneeOld = 0.00243*current*current - 3.51415*current + 2311.66500;
%constantT = (0.1398*current - 7.849)*0.737561;
%kneeNew = kneeOld*(voltage/24);

%initialize variables
step = .1;                %step for accumulating acceleration
minutes = .75;            %simulation time in minutes
seconds = minutes*60;

time = 0:step:seconds;    %array for time
RPM = 0;                 %starting RPM
front_gear = input('Motor Gear Teeth? '); %prompt user to select gear ratio
axle_gear = input('Axle Gear Teeth? ');
gearRatio = axle_gear/front_gear;         %calculate gear ratio
radius = 5.25/12;                     % back tire radius converted to feet
w_batt = (voltage/12)*29.3;             % battery weight in lb

w_kart = 182; % weight of kart in lb
w_driver = input('What is the weight of the Driver? ');%weight of driver in lb
weight_total = (w_kart+ w_driver+ w_batt); %total kart weight
mass = (weight_total)/32.2; % Total Weight/ 32.2 accel due to gravity
us=.79; %static coefficient of friction of rubber on asphalt
uk=.70; %kinetic coefficent of friction of rubber on asphalt
F_fric = weight_total*us*.65; %0.65 corresponds to weight distribution on the rear axle
F_fric2=weight_total*us*.35;%0.35 corresponds to weight distribution on the rear axle
slip_T_wheel = F_fric* radius;
slip_T_motor = slip_T_wheel/(.95*gearRatio);
velocity = 0:step:seconds; % initial velocity is 0
torque = constantT; %initializing torque value with T of linear region
velocityMPH = 0:step:seconds; %array created for velocity in MPH
position= 0:step:seconds; %array created for position
tire_press = 56*.06895; % tire pressure in bar
multiplier=(0.000275*current*current + 0.186921*current - 11.027800);
exponent= (-0.00136*current - 0.09420)/1000;
torqueCurve = 0:step:seconds-step; %array created for torque
RPMCurve = 0:step:seconds-step; %array created for RPM Curve
slip_curve = 0:step:seconds-step; %array created for slip_torque
actualTorque = 0:step:seconds-step; %array created for actual Torque

%flags for 30MPH time and 1/8th time
p=0;
v=0;

%Battery Discharge Portion
Discharge_time = (((voltage/12)*100*voltage)/((current*voltage)/(.85)))*60;

for j = 2:((seconds/step)+1) %iterator
    
    coef = .005+(1/tire_press)*(.01+.0095*((velocity(j)*1.60934)/100)^2); %find coefficient of friction
    
    if (RPM < kneeNew) % torque, acceleration calculated for exponential region
        torqueCurve(j-1) = constantT;
        if(torque > slip_T_motor)
            torque = slip_T_motor; % torque is in linear region
        end
        T3 = torque*(.95)*(gearRatio); % torque at back wheel
        forceT = T3/radius; % torque force
        netForce = forceT-coef*mass*32.2; % force with friction
        accel = netForce/mass; % accelleration
    end
    if (RPM >= kneeNew) % torque, acceleration calculated for exponential region
        tempval=exponent*RPM*(24/voltage);
        torque =  multiplier*0.737561*exp(tempval);
        torqueCurve(j-1) = torque;
        if (torque > slip_T_motor)
           torque =  slip_T_motor;
        end
        T3 = torque*(.95)*(gearRatio);
        forceT = T3/radius;
        netForce = forceT-coef*mass*32.2;
        accel = netForce/mass;
    end
    if (RPM >= 7000) %max rpm
        accel = 0;
    end
    
    velocity(j) = velocity(j-1) + accel*step; % velocity at new point is the velocity at the last point + the acceleration*the time difference 
    position(j) = position(j-1) + velocity(j)*step; % velocity at new point is the velocity at the last point + the acceleration*the time difference
    RPM = ((velocity(j)*60*gearRatio)/(2*pi*radius)); % new RPM is calculated from velocity
    velocityMPH(j) = velocity(j)*(.681818); % velocity converted to MPH
    if (velocityMPH(j) > 30)&&(v==0) % time to 30 found
            timeTo30 = time(j);
            v=1;    
    end
    if (position(j) > 660)&&(p==0) % time to 1/8th mile
            oneEighth = time(j);
            p=1;    
    end
    
    %index arrays
    RPMCurve(j-1) = RPM;
    actualTorque(j-1)=torque;
    slip_curve(j-1) = slip_T_motor;
end

%Output the new Gear ratio for ideal use at the given current and voltage
New_Gear_Ratio=(gearRatio/(constantT/slip_T_motor));
New_Motor_Gear=(round(axle_gear/New_Gear_Ratio));
fprintf('\n\n\nThe new motor gear with these inputs should have %0.0f teeth\n', New_Motor_Gear) 

%Determine the braking distance given input values
acceleration=((uk/us)*F_fric+(coef/us)*F_fric2)/mass; %deceleration due to friction forces
braking_distance=30^2/(2*acceleration);
%All variable


fprintf('The braking distance from 30MPH to 0MPH is %0.2f ft\n', braking_distance)
fprintf('The top speed of the go kart is %0.2f MPH\n', velocityMPH(j))
figure
    plot(time,velocityMPH)%,Times,PeriodMPH)
    xlabel('Time (Seconds)');
    ylabel('Velocity (MPH)');
    legend('Battery Powered Go-Kart')%,'IC Go-Kart')
figure
    plot(time,position)
    xlabel('Time (Seconds)');
    ylabel('Position (Miles)');

fprintf('The battery discharge time at %0.0f Amps and %0.0f Volts is %0.2f minutes\n',current,voltage,Discharge_time) 
figure
    plot(RPMCurve,torqueCurve, RPMCurve, slip_curve,RPMCurve, actualTorque)
    xlabel('RPM');
    ylabel('Torque');
    legend('Motor Torque','Slip Torque', 'Utilized Torque')
    %print time 0-30 & 0-1/8 mile
    fprintf('Acceleration from 0-30 MPH is %0.2f sec\n',timeTo30)
    fprintf('Time to 1/8th Mile is %0.2f sec\n\n\n',oneEighth)
