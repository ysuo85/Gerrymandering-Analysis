Assuming you have [Vagrant installed](https://www.vagrantup.com/intro/getting-started/install.html), from this directory just run
```
vagrant up
```
This will take a while, so grab a coffee and keep reading. 

This creates a Vagrant VM off an Ubuntu base box and run the Ansible playbook, which currently does the following: 

- Installs Nginx

- Installs Oracle JDK

- Installs Gradle

- Clones Gerrymandering-Analysis into /home/ubuntu

- Sets up a sample html page in /var/www/html 

Once it's ready, go to localhost:8000 in your browser (port 8000 is specified in the VagrantFile, change it if you like)

You should see the sample "basic user.html"

Now, to access the VM: 
```
vagrant ssh
```

Once you have ssh'd into the box, anything you add or modify in /vagrant will sync with the current directory outside the box, on your computer. This goes the other way too, so if you want to edit a file using an IDE on your computer, you can move the file to /vagrant and modify it from your computer. The changes will be saved in the box in /vagrant 
