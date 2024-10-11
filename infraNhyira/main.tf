resource "aws_instance" "public_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key"  
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "public_ec2_01"
  }

  user_data = <<-EOF
    #!/bin/bash
    # Atualizar pacotes
    sudo apt-get update
    sudo apt-get upgrade -y

    # Instalar Docker e Docker Compose
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce

    # Instalar a versão mais recente do Docker Compose
    DOCKER_COMPOSE_VERSION=\$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\\K[^\\"]+')
    sudo curl -L "https://github.com/docker/compose/releases/download/\${DOCKER_COMPOSE_VERSION}/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Verificar se o Docker Compose foi instalado corretamente
    docker-compose --version

    # Instalar git, Node.js e npm, se necessário
    sudo apt-get install -y git nodejs npm

    # Clonar ou atualizar o repositório
    cd /home/ubuntu/frontend || {
      git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
    }

    cd /home/ubuntu/frontend
    git pull origin main  # Atualiza o repositório

    # Instalar dependências do Node.js
    sudo npm ci

    # Apagar diretório dist anterior e criar nova build
    sudo rm -rf /var/www/dist
    sudo npm run build

    # Copiar a pasta 'dist' para o diretório web
    sudo mkdir -p /var/www
    sudo cp -r dist /var/www

    # Ajustar permissões para o nginx (usuário www-data)
    sudo chown -R www-data:www-data /var/www

    # Criar diretório de certificados SSL
    sudo mkdir -p /home/ubuntu/frontend/certs

    # Gerar certificado SSL autoassinado
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/ubuntu/frontend/certs/selfsigned.key -out /home/ubuntu/frontend/certs/selfsigned.crt -subj "/C=BR/ST=Sao Paulo/L=Sao Paulo/O=Minha Empresa/OU=TI/CN=example.com"

    # Configurar o nginx para usar o certificado
    sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
    server {
        listen 80;
        server_name _;
        return 301 https://\$host\$request_uri;
    }

    server {
        listen 443 ssl;
        server_name _;

        ssl_certificate /home/ubuntu/frontend/certs/selfsigned.crt;
        ssl_certificate_key /home/ubuntu/frontend/certs/selfsigned.key;

        root /var/www/dist;
        index index.html;

        location / {
            try_files \$uri \$uri/ /index.html;
        }
    }
    EOL

    # Reiniciar nginx
    sudo systemctl restart nginx

    # Logar o sucesso da execução do script
    echo "Script de inicialização concluído" | sudo tee -a /var/log/user_data.log
  EOF
}

resource "aws_instance" "public_ec2_02" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key" 
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "public_ec2_02"
  }

  user_data = <<-EOF
    #!/bin/bash
    # Atualizar pacotes
    sudo apt-get update
    sudo apt-get upgrade -y

    # Instalar Docker e Docker Compose
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce

    # Instalar a versão mais recente do Docker Compose
    DOCKER_COMPOSE_VERSION=\$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\\K[^\\"]+')
    sudo curl -L "https://github.com/docker/compose/releases/download/\${DOCKER_COMPOSE_VERSION}/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Verificar se o Docker Compose foi instalado corretamente
    docker-compose --version

    # Instalar git, Node.js e npm, se necessário
    sudo apt-get install -y git nodejs npm

    # Clonar ou atualizar o repositório
    cd /home/ubuntu/frontend || {
      git clone https://github.com/nhyira-group5/sistema-vitalis.git /home/ubuntu/frontend
    }

    cd /home/ubuntu/frontend
    git pull origin main  # Atualiza o repositório

    # Instalar dependências do Node.js
    sudo npm ci

    # Apagar diretório dist anterior e criar nova build
    sudo rm -rf /var/www/dist
    sudo npm run build

    # Copiar a pasta 'dist' para o diretório web
    sudo mkdir -p /var/www
    sudo cp -r dist /var/www

    # Ajustar permissões para o nginx (usuário www-data)
    sudo chown -R www-data:www-data /var/www

    # Criar diretório de certificados SSL
    sudo mkdir -p /home/ubuntu/frontend/certs

    # Gerar certificado SSL autoassinado
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/ubuntu/frontend/certs/selfsigned.key -out /home/ubuntu/frontend/certs/selfsigned.crt -subj "/C=BR/ST=Sao Paulo/L=Sao Paulo/O=Minha Empresa/OU=TI/CN=example.com"

    # Configurar o nginx para usar o certificado
    sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
    server {
        listen 80;
        server_name _;
        return 301 https://\$host\$request_uri;
    }

    server {
        listen 443 ssl;
        server_name _;

        ssl_certificate /home/ubuntu/frontend/certs/selfsigned.crt;
        ssl_certificate_key /home/ubuntu/frontend/certs/selfsigned.key;

        root /var/www/dist;
        index index.html;

        location / {
            try_files \$uri \$uri/ /index.html;
        }
    }
    EOL

    # Reiniciar nginx
    sudo systemctl restart nginx

    # Logar o sucesso da execução do script
    echo "Script de inicialização concluído" | sudo tee -a /var/log/user_data.log
  EOF
}

resource "aws_eip_association" "eip_assoc_01" {
  instance_id   = aws_instance.public_ec2_01.id
  allocation_id = "eipalloc-0b33881f72855426a" 
}

resource "aws_eip_association" "eip_assoc_02" {
  instance_id   = aws_instance.public_ec2_02.id
  allocation_id = "eipalloc-01952682e36b66c3" 
}
