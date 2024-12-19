<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Rental</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .car-card {
            display: inline-block;
            width: 45%;
            margin: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            background-color: #fff;
        }

        .car-card img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }

        .car-card h3 {
            font-size: 1.2em;
            margin-top: 10px;
        }

        .car-card p {
            color: #555;
            font-size: 1em;
            margin: 10px 0;
        }

        .car-card .price {
            font-weight: bold;
            color: #007BFF;
        }

        .view-details {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            margin-top: 10px;
        }

        .view-details:hover {
            background-color: #0056b3;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 90%;
            max-width: 500px;
        }

        .close-modal {
            float: right;
            font-size: 24px;
            cursor: pointer;
        }

        label {
            display: block;
            margin: 10px 0 5px;
        }

        input, select, button, textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #007BFF;
            color: #fff;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <!-- Car Cards -->
    <div class="car-card" data-id="1">
        <img src="http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpics.net%2Fwp-content%2Fuploads%2F2017%2F12%2FToyota-Corolla-images-scaled.jpg&f=1&nofb=1&ipt=" alt="Toyota Corolla">
        <h3>Toyota Corolla</h3>
        <p>Comfortable, reliable, and fuel-efficient car perfect for city driving.</p>
        <p class="price">R450/day</p>
        <button class="view-details">View Car Details</button>
    </div>

    <div class="car-card" data-id="2">
        <img src="http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F39%2Fb7%2F52%2F39b752efca78f2236cef542c316a5b3a.jpg&f=1&nofb=1&ipt=aaa9304d" alt="Ford Ranger">
        <h3>Ford Ranger</h3>
        <p>Powerful and robust pickup truck, ideal for off-road adventures.</p>
        <p class="price">R600/day</p>
        <button class="view-details">View Car Details</button>
    </div>

    <!-- Modal -->
    <div id="car-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img id="modal-car-image" src="" alt="Car Image" style="width: 100%; height: auto;">
            <h2 id="modal-car-name"></h2>
            <p id="modal-car-description"></p>

            <!-- Section 1: Car Information -->
            <div id="car-info">
                <p id="rental-fee-breakdown"></p>
            </div>

            <!-- Section 2: User Inputs -->
            <div id="user-inputs">
                <label for="days-rent">Number of Days:</label>
                <input type="number" id="days-rent" min="1" value="1">

                <label for="coverage">Coverage:</label>
                <select id="coverage">
                    <option value="150">Minimum Coverage (R150)</option>
                    <option value="200">Maximum Coverage (R200)</option>
                </select>

                <button id="calculate-btn">Calculate</button>
            </div>

            <!-- Display Calculated Total -->
            <div id="calculated-total" style="display: none;">
                <p><strong>Total Rental Cost:</strong> <span id="final-cost"></span></p>
            </div>

            <!-- Section 3: User Information Form -->
            <div id="user-info-form" style="display: none;">
                <label for="full-name">Full Name:</label>
                <input type="text" id="full-name">

                <label for="id-number">ID Number:</label>
                <input type="text" id="id-number">

                <label for="license-number">License Number:</label>
                <input type="text" id="license-number">

                <label for="license-code">License Code:</label>
                <input type="text" id="license-code">

                <button id="proceed-btn">Proceed</button>
            </div>

            <!-- WhatsApp Integration -->
            <textarea id="whatsapp-message" style="display: none;"></textarea>
        </div>
    </div>

    <script>
        // Sample data for cars
        const carsData = [
            {
                id: 1,
                name: "Toyota Corolla",
                description: "Comfortable, reliable, and fuel-efficient car perfect for city driving.",
                imageUrl: "http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpics.net%2Fwp-content%2Fuploads%2F2017%2F12%2FToyota-Corolla-images-scaled.jpg&f=1&nofb=1&ipt=",
                rentalRate: 450,
                insuranceWaiver: 150,
                contractFee: 200,
                adminFee: 130,
                deposit: 3000,
                freeKilometers: 200,
                ratePerHour: 350,
                insurancePerDay: 40
            },
            {
                id: 2,
                name: "Ford Ranger",
                description: "Powerful and robust pickup truck, ideal for off-road adventures.",
                imageUrl: "http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F39%2Fb7%2F52%2F39b752efca78f2236cef542c316a5b3a.jpg&f=1&nofb=1&ipt=aaa9304d",
                rentalRate: 600,
                insuranceWaiver: 200,
                contractFee: 250,
                adminFee: 150,
                deposit: 5000,
                freeKilometers: 150,
                ratePerHour: 400,
                insurancePerDay: 50
            }
            // Add more car data as needed
        ];

        const modal = document.getElementById('car-modal');
        const closeModal = document.querySelector('.close-modal');

        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const carId = this.closest('.car-card').getAttribute('data-id');
                const car = carsData.find(car => car.id == carId);

                // Populate car details in the modal
                document.getElementById('modal-car-image').src = car.imageUrl;
                document.getElementById('modal-car-name').textContent = car.name;
                document.getElementById('modal-car-description').textContent = car.description;
                document.getElementById('rental-fee-breakdown').innerHTML = `
                    <p><strong>Rental Rate:</strong> R${car.rentalRate}/day</p>
                    <p><strong>Insurance Waiver:</strong> R${car.insuranceWaiver}</p>
                    <p><strong>Contract Fee:</strong> R${car.contractFee}</p>
                    <p><strong>Admin Fee:</strong> R${car.adminFee}</p>
                    <p><strong>Deposit:</strong> R${car.deposit}</p>
                    <p><strong>Free Kilometers:</strong> ${car.freeKilometers} km</p>
                    <p><strong>Rate Per Hour:</strong> R${car.ratePerHour}</p>
                    <p><strong>Insurance Per Day:</strong> R${car.insurancePerDay}</p>
                `;

                // Show user inputs
                document.getElementById('user-inputs').style.display = 'block';

                // Calculate button
                document.getElementById('calculate-btn').addEventListener('click', function() {
                    const days = document.getElementById('days-rent').value;
                    const coverage = document.getElementById('coverage').value;
                    const total = car.rentalRate * days + parseInt(coverage);

                    // Show calculated total
                    document.getElementById('calculated-total').style.display = 'block';
                    document.getElementById('final-cost').textContent = `R${total}`;

                    // Show user info form
                    document.getElementById('user-info-form').style.display = 'block';

                    // Proceed button for WhatsApp integration
                    document.getElementById('proceed-btn').addEventListener('click', function() {
                        const fullName = document.getElementById('full-name').value;
                        const idNumber = document.getElementById('id-number').value;
                        const licenseNumber = document.getElementById('license-number').value;
                        const licenseCode = document.getElementById('license-code').value;

                        const message = `Car Rental Details:
                        \nCar: ${car.name}
                        \nDays: ${days}
                        \nCoverage: R${coverage}
                        \nTotal: R${total}
                        \nName: ${fullName}
                        \nID: ${idNumber}
                        \nLicense: ${licenseNumber}
                        \nLicense Code: ${licenseCode}`;

                        document.getElementById('whatsapp-message').value = message;
                        window.location.href = `https://wa.me/your-number?text=${encodeURIComponent(message)}`;
                    });
                });

                // Show the modal
                modal.style.display = "flex";
            });
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    </script>
</body>
</html>
